import {
  DrawPolygonMode,
  DrawRectangleMode,
  DrawCircleFromCenterMode,
  DrawPolygonByDraggingMode
} from '@nebula.gl/edit-modes';

export const DRAW_MODES = Object.freeze({
  POLYGON: DrawPolygonMode.name,
  RECTANGLE: DrawRectangleMode.name,
  CIRCLE: DrawCircleFromCenterMode.name,
  LASSO_TOOL: DrawPolygonByDraggingMode.name
});

export const EDIT_MODES = Object.freeze({
  EDIT: 'edit'
});
