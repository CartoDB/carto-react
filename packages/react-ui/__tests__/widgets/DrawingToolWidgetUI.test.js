import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';
import DrawingToolWidgetUI from '../../src/widgets/DrawingToolWidgetUI';
import { capitalize, SvgIcon } from '@material-ui/core';

const CURSOR_ICON_ID = 'cursor-icon';

const CursorIcon = (
  <SvgIcon id={CURSOR_ICON_ID}>
    <path d='m10.083 19.394.057.113a1 1 0 0 0 1.72.007l2.869-4.786 4.785-2.87a1 1 0 0 0-.12-1.777l-14-6c-.83-.356-1.669.483-1.313 1.313l6.002 14zM6.905 6.904l9.903 4.244-3.322 1.995-.102.069a1 1 0 0 0-.242.274l-1.992 3.321-4.245-9.903z' />
  </SvgIcon>
);

const POLYGON_ICON_ID = 'polygon-icon';

const PolygonIcon = (
  <SvgIcon id={POLYGON_ICON_ID}>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.995 2.995 0 0 0 0 2H6.829a2.995 2.995 0 0 0 0-2h10.342zm-2.463-5.707 3.998 4a3.012 3.012 0 0 0-1.414 1.414l-4-3.999a3.013 3.013 0 0 0 1.31-1.214l.106-.201zM2.998 6.829a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm1.84-3.919c.464.483 1.09.81 1.79.896l-1.47 2.94a2.992 2.992 0 0 0-1.79-.894l1.47-2.942zM16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9.171.998a2.995 2.995 0 0 0 0 2.002H6.829a2.995 2.995 0 0 0 0-2.002h6.342z' />
  </SvgIcon>
);

const RECTANGLE_ICON_ID = 'rectangle-icon';

const RectangleIcon = (
  <SvgIcon id={RECTANGLE_ICON_ID}>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.994 2.994 0 0 0-.17.974l-.001.052.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2h10.342zM2.998 6.828a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zm16.001 0a2.995 2.995 0 0 0 2 0v10.342a2.995 2.995 0 0 0-2 0V6.829zM20 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm13.171.998a2.994 2.994 0 0 0-.17.976L17 4.026l.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2H17.17z' />
  </SvgIcon>
);

const DRAW_MODES = [
  { id: 'polygon', label: 'polygon', icon: PolygonIcon },
  { id: 'rectangle', label: 'rectangle', icon: RectangleIcon }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: CursorIcon }];

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
    const onActivatedChange = jest.fn();
    const rendered = render(
      <CommonDrawingToolWidgetUI onActivatedChange={onActivatedChange} />
    );

    const selectedModeBtn = getById(rendered.container, POLYGON_ICON_ID);
    expect(selectedModeBtn).toBeDefined();

    fireEvent.click(selectedModeBtn);
    expect(onActivatedChange).toHaveBeenCalledWith(true);

    rendered.rerender(
      <CommonDrawingToolWidgetUI onActivatedChange={onActivatedChange} activated={true} />
    );

    fireEvent.click(selectedModeBtn);
    expect(onActivatedChange).toHaveBeenCalledWith(false);
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
