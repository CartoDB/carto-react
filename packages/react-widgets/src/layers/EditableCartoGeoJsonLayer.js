import { EditableGeoJsonLayer } from '@nebula.gl/layers';

// EditableGeoJsonLayer extends EditableLayer and it's its code https://github.com/uber/nebula.gl/blob/master/modules/layers/src/layers/editable-layer.ts#L75
// We've overwritten _addEventHandlers and _removeEventHandlers to be able to use an eventManager sent it as a property instead of use
// the default (this.context.deck.eventManager). We need to do this to get the compatibility with Google maps because GoogleMapsOverlay
// uses its own event system

const EVENT_TYPES = ['anyclick', 'pointermove', 'panstart', 'panmove', 'panend', 'keyup'];

export default class EditableCartoGeoJsonLayer extends EditableGeoJsonLayer {
  _addEventHandlers() {
    const eventManager = this._getEventManager();
    const { eventHandler } = this.state._editableLayerState;

    for (const eventType of EVENT_TYPES) {
      eventManager.on(eventType, eventHandler, {
        // give nebula a higher priority so that it can stop propagation to deck.gl's map panning handlers
        priority: 100
      });
    }
  }

  _removeEventHandlers() {
    const eventManager = this._getEventManager();
    const { eventHandler } = this.state._editableLayerState;

    for (const eventType of EVENT_TYPES) {
      eventManager.off(eventType, eventHandler);
    }
  }

  _getEventManager() {
    return this.props.eventManager || this.context.deck.eventManager;
  }
}
