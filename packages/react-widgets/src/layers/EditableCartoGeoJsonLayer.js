import { EditableGeoJsonLayer } from '@nebula.gl/layers';

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
