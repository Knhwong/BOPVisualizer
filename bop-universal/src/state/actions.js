import { state } from './store.js';
import { transformCSVtoBOPStructure } from '../services/dataTransforms.js';
import { computeColorScale } from '../services/colorScale.js';

function updateState(patch) {
  // patch = (oldState) => newState
  state.update(patch);
}

export function loadBOPFromRawCSV(parsedRows) {
  const { bopData, periods } = transformCSVtoBOPStructure(parsedRows);

  updateState(s => ({
    ...s,
    bopData,
    periods,
    selectedPeriod: periods.at(-1),   // default to most recent
  }));

  // compute initial color scale
  computeAndSetColorScale(periods.at(-1), bopData);
}

export function setSelectedPeriod(period) {
  updateState(s => ({
    ...s,
    selectedPeriod: period
  }));

  // recompute scale based on new period
  computeAndSetColorScale(period);
}

export function setHoverCountry(code) {
  updateState(s => ({
    ...s,
    map: {
      ...s.map,
      hoverCountry: code
    }
  }));
}

export function setSelectedCountry(code) {
  updateState(s => ({
    ...s,
    map: {
      ...s.map,
      selectedCountry: code
    },
    sidebar: {
      ...s.sidebar,
      isOpen: true,
      country: code
    }
  }));
}

export function openSidebar(country) {
  updateState(s => ({
    ...s,
    sidebar: {
      ...s.sidebar,
      isOpen: true,
      country
    }
  }));
}

export function closeSidebar() {
  updateState(s => ({
    ...s,
    sidebar: {
      ...s.sidebar,
      isOpen: false,
      country: null
    }
  }));
}

export function computeAndSetColorScale(period, manualBopData = null) {
  updateState(s => {
    const bopData = manualBopData || s.bopData;
    const scale = computeColorScale(bopData, period);

    return {
      ...s,
      map: {
        ...s.map,
        colorScale: scale
      }
    };
  });
}
