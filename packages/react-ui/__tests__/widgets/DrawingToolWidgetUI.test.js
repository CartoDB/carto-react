import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';
import DrawingToolWidgetUI from '../../src/widgets/DrawingToolWidgetUI';
import { capitalize } from '@material-ui/core';
import CursorIcon from '../../src/assets/CursorIcon';
import PolygonIcon from '../../src/assets/PolygonIcon';
import RectangleIcon from '../../src/assets/RectangleIcon';

const POLYGON_ICON_ID = 'polygon-icon';

const RECTANGLE_ICON_ID = 'rectangle-icon';

const DRAW_MODES = [
  { id: 'polygon', label: 'polygon', icon: <PolygonIcon id={POLYGON_ICON_ID} /> },
  { id: 'rectangle', label: 'rectangle', icon: <RectangleIcon id={RECTANGLE_ICON_ID} /> }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: <CursorIcon /> }];

const CommonDrawingToolWidgetUI = (props) => (
  <DrawingToolWidgetUI
    drawModes={DRAW_MODES}
    editModes={EDIT_MODES}
    selectedMode={DRAW_MODES[0].id}
    {...props}
  />
);

const getById = queryByAttribute.bind(null, 'id');

describe('DrawingToolWidgetUI', () => {
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => jest.fn()));
  afterAll(() => jest.restoreMocks());
  test('renders selectedMode correctly', () => {
    const { container } = render(
      <DrawingToolWidgetUI drawModes={DRAW_MODES} selectedMode={DRAW_MODES[0].id} />
    );
    expect(getById(container, POLYGON_ICON_ID)).toBeInTheDocument();
    const { container: container2 } = render(
      <DrawingToolWidgetUI drawModes={DRAW_MODES} selectedMode={DRAW_MODES[1].id} />
    );
    expect(getById(container2, RECTANGLE_ICON_ID)).toBeInTheDocument();
  });

  test('throw error if selectedMode is not found neither in draw modes or edit modes', () => {
    expect(() =>
      render(<DrawingToolWidgetUI drawModes={DRAW_MODES} selectedMode={'IInvented'} />)
    ).toThrowError('Selected mode provided is not found neither in drawing or edit mode');
  });

  test('activate selected mode event is correctly raised', () => {
    const onEnabledChange = jest.fn();
    const rendered = render(
      <CommonDrawingToolWidgetUI onEnabledChange={onEnabledChange} />
    );

    const selectedModeBtn = getById(rendered.container, POLYGON_ICON_ID);
    expect(selectedModeBtn).toBeDefined();

    fireEvent.click(selectedModeBtn);
    expect(onEnabledChange).toHaveBeenCalledWith(true);

    rendered.rerender(
      <CommonDrawingToolWidgetUI onEnabledChange={onEnabledChange} enabled={true} />
    );

    fireEvent.click(selectedModeBtn);
    expect(onEnabledChange).toHaveBeenCalledWith(false);
  });

  test('drawModes and editModes are rendered correctly in modes menu', () => {
    const rendered = render(<CommonDrawingToolWidgetUI />);
    const menuBtn = rendered.getByTitle('Select a mode');
    // Open menu
    fireEvent.click(menuBtn);
    // Once the menu is opened, check everything is okey rendered
    [...DRAW_MODES, ...EDIT_MODES].forEach(({ label }) =>
      expect(rendered.getByText(capitalize(label))).toBeDefined()
    );
  });

  test('select mode event is correctly raised', () => {
    const onSelectMode = jest.fn();
    const rendered = render(<CommonDrawingToolWidgetUI onSelectMode={onSelectMode} />);

    const menuBtn = rendered.getByTitle('Select a mode');
    // Open menu
    fireEvent.click(menuBtn);

    const anotherMode = DRAW_MODES[1];

    const anotherModeBtn = rendered.getByText(capitalize(anotherMode.label));
    expect(anotherModeBtn).toBeDefined();
    fireEvent.click(anotherModeBtn);

    expect(onSelectMode).toHaveBeenCalledWith(anotherMode.id);
  });

  const GEOMETRY = { geometry: 1 };
  test('geometry is rendered correctly', () => {
    const rendered = render(<CommonDrawingToolWidgetUI geometry={GEOMETRY} />);
    expect(rendered.getByText('Feature')).toBeDefined();
  });

  test('geometry select event is raised correctly', () => {
    const onSelectGeometry = jest.fn();

    const rendered = render(
      <CommonDrawingToolWidgetUI
        geometry={GEOMETRY}
        onSelectGeometry={onSelectGeometry}
      />
    );

    const geometryBtn = rendered.getByText('Feature');
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
      <CommonDrawingToolWidgetUI
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
