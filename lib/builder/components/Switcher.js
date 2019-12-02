/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

const Switcher = props => {
  const {
    text: { title = '', on = 'On', off = 'Off' },
    checked,
    onChange,
    children
  } = props;
  const switcherTitle = children || (
    <span className="switcher__title">{title}</span>
  );
  return (
    <div className="switcher">
      <label className="switcher__label">
        {switcherTitle}
        <input
          type="checkbox"
          name="on-off-switch"
          className="switcher__input"
          checked={checked}
          onChange={onChange}
        />
        <div className="switcher__toggle" aria-hidden="true">
          <div className="switcher__switch" />
        </div>
        <div className="switcher__value">
          <span className="switcher__value__label on">{on}</span>
          <span className="switcher__value__label off">{off}</span>
        </div>
      </label>
    </div>
  );
};

export default Switcher;

Switcher.defaultProps = {
  text: {},
  onChange: () => {}
};

Switcher.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    on: PropTypes.string,
    off: PropTypes.string
  }),
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};
