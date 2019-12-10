/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccordionSection = props => {
  const { isOpen, label, children, onClick } = props;
  const sectionOnClick = () => onClick(label);
  let itemClass = 'accordion__item';
  if (isOpen) {
    itemClass = `${itemClass} open`;
  }
  return (
    <div className={itemClass}>
      <div
        className="accordion__item__heading heading"
        onClick={sectionOnClick}
      >
        <FontAwesomeIcon
          icon="chevron-right"
          size="sm"
          className="heading__icon"
        />
        {label}
      </div>
      <div className="accordion__item__content" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
};

AccordionSection.propTypes = {
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.object,
  onClick: PropTypes.func
};

const Accordion = props => {
  const { children, allowMultipleOpen } = props;
  const [openSections, setOpenSections] = useState({});
  const onClick = label => {
    const isOpen = !!openSections[label];
    const updatedSections = allowMultipleOpen
      ? {
          ...openSections,
          [label]: !isOpen
        }
      : {
          [label]: !isOpen
        };
    setOpenSections(updatedSections);
  };
  return (
    <div className="accordion">
      {children.map(child => (
        <AccordionSection
          key={child.props.label}
          isOpen={!!openSections[child.props.label]}
          label={child.props.label}
          onClick={onClick}
        >
          {child.props.children}
        </AccordionSection>
      ))}
    </div>
  );
};

export default Accordion;

Accordion.defaultProps = {
  allowMultipleOpen: false
};

Accordion.propTypes = {
  allowMultipleOpen: PropTypes.bool,
  children: PropTypes.object.isRequired
};
