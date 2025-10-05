
import React from 'react';

const FormCoordinate = ({ lat, lng, handleLatChange, handleLngChange, handleAddCoordinate,ws,wd,handleWs,handleWd }) => (
  <form onSubmit={handleAddCoordinate} style={{ marginBottom: '20px' }}>
    <h3>Wind Conditions & Fire Support</h3>
    <label>
      Latitude:
      <input
        type="number"
        step="any"
        value={lat}
        onChange={handleLatChange}
        placeholder=" -18.0"
      />
    </label>
    <br />
    <label>
      Longitude:
      <input
        type="number"
        step="any"
        value={lng}
        onChange={handleLngChange}
        placeholder=" -63.5"
      />
    </label>
    <br />
    <label>
      Wind Speed:
      <input
        type="text"
        step="any"
        value={ws}
        onChange={handleWs}
        placeholder=" 5km/h"
      />
    </label>
    <br />
    <label>
      Wind Direction:
      <input
        type="text"
        step="any"
        value={wd}
        onChange={handleWd}
        placeholder=" 45° NO"
      />
    </label>
    <br />
    <button type="submit">Notify</button>
  </form>
);

export default FormCoordinate;
