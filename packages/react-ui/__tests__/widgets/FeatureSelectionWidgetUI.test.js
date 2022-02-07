import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';
import FeatureSelectionWidgetUI from '../../src/widgets/FeatureSelectionWidgetUI';
import { capitalize } from '@material-ui/core';
import CursorIcon from '../../src/assets/CursorIcon';
import PolygonIcon from '../../src/assets/PolygonIcon';
import RectangleIcon from '../../src/assets/RectangleIcon';

const POLYGON_ICON_ID = 'polygon-icon';

const RECTANGLE_ICON_ID = 'rectangle-icon';

const FEATURE_SELECTION_MODES = [
  { id: 'polygon', label: 'polygon', icon: <PolygonIcon id={POLYGON_ICON_ID} /> },
  { id: 'rectangle', label: 'rectangle', icon: <RectangleIcon id={RECTANGLE_ICON_ID} /> }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit mask', icon: <CursorIcon /> }];

const CommonFeatureSelectionWidgetUI = (props) => (
  <FeatureSelectionWidgetUI
    selectionModes={FEATURE_SELECTION_MODES}
    editModes={EDIT_MODES}
    selectedMode={FEATURE_SELECTION_MODES[0].id}
    {...props}
  />
);

const getById = queryByAttribute.bind(null, 'id');

describe('FeatureSelectionWidgetUI', () => {
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => jest.fn()));
  afterAll(() => jest.restoreMocks());
  test('renders selectedMode correctly', () => {
    const { container } = render(
      <FeatureSelectionWidgetUI
        selectionModes={FEATURE_SELECTION_MODES}
        selectedMode={FEATURE_SELECTION_MODES[0].id}
      />
    );
    expect(getById(container, POLYGON_ICON_ID)).toBeInTheDocument();
    const { container: container2 } = render(
      <FeatureSelectionWidgetUI
        selectionModes={FEATURE_SELECTION_MODES}
        selectedMode={FEATURE_SELECTION_MODES[1].id}
      />
    );
    expect(getById(container2, RECTANGLE_ICON_ID)).toBeInTheDocument();
  });

  test('throw error if selectedMode is not found neither in select modes or edit modes', () => {
    expect(() =>
      render(
        <FeatureSelectionWidgetUI
          selectionModes={FEATURE_SELECTION_MODES}
          selectedMode={'IInvented'}
        />
      )
    ).toThrowError('Selected mode not supported');
  });

  test('activate selected mode event is correctly raised', () => {
    const onEnabledChange = jest.fn();
    const rendered = render(
      <CommonFeatureSelectionWidgetUI onEnabledChange={onEnabledChange} />
    );

    const selectedModeBtn = getById(rendered.container, POLYGON_ICON_ID);
    expect(selectedModeBtn).toBeDefined();

    fireEvent.click(selectedModeBtn);
    expect(onEnabledChange).toHaveBeenCalledWith(true);

    rendered.rerender(
      <CommonFeatureSelectionWidgetUI onEnabledChange={onEnabledChange} enabled={true} />
    );

    fireEvent.click(selectedModeBtn);
    expect(onEnabledChange).toHaveBeenCalledWith(false);
  });

  test('selectionModes and editModes are rendered correctly in modes menu', () => {
    const rendered = render(<CommonFeatureSelectionWidgetUI />);
    const menuBtn = rendered.getByTitle('Select a mode');
    // Open menu
    fireEvent.click(menuBtn);
    // Once the menu is opened, check everything is okey rendered
    [...FEATURE_SELECTION_MODES, ...EDIT_MODES].forEach(({ label }) =>
      expect(rendered.getByText(capitalize(label))).toBeDefined()
    );
  });

  test('select mode event is correctly raised', () => {
    const onSelectMode = jest.fn();
    const rendered = render(
      <CommonFeatureSelectionWidgetUI onSelectMode={onSelectMode} />
    );

    const menuBtn = rendered.getByTitle('Select a mode');
    // Open menu
    fireEvent.click(menuBtn);

    const anotherMode = FEATURE_SELECTION_MODES[1];

    const anotherModeBtn = rendered.getByText(capitalize(anotherMode.label));
    expect(anotherModeBtn).toBeDefined();
    fireEvent.click(anotherModeBtn);

    expect(onSelectMode).toHaveBeenCalledWith(anotherMode.id);
  });

  const GEOMETRY = { geometry: 1 };
  test('geometry is rendered correctly', () => {
    const rendered = render(<CommonFeatureSelectionWidgetUI geometry={GEOMETRY} />);
    expect(rendered.getByText('Mask')).toBeDefined();
  });

  test('geometry select event is raised correctly', () => {
    const onSelectGeometry = jest.fn();

    const rendered = render(
      <CommonFeatureSelectionWidgetUI
        geometry={GEOMETRY}
        onSelectGeometry={onSelectGeometry}
      />
    );

    const geometryBtn = rendered.getByText('Mask');
    expect(geometryBtn).toBeDefined();

    // Test select geometry
    fireEvent.click(geometryBtn);
    expect(onSelectGeometry).toBeCalled();

    // If onDeleteGeometry isn't provided, remove btn shouldn't appear
    const removeBtn = rendered.container.querySelector('.MuiChip-deleteIcon');
    expect(removeBtn).toBe(null);
  });

  test('geometry delete event is raised correctly', () => {
    const onDeleteGeometry = jest.fn();

    const rendered = render(
      <CommonFeatureSelectionWidgetUI
        geometry={GEOMETRY}
        onDeleteGeometry={onDeleteGeometry}
      />
    );

    // Test remove geometry
    const removeBtn = rendered.container.querySelector('.MuiChip-deleteIcon');
    expect(removeBtn).toBeDefined();
    fireEvent.click(removeBtn);

    expect(onDeleteGeometry).toBeCalled();
  });
});
