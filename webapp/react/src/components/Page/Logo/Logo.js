import React from 'react';
import PropType from 'prop-types';

const Logo = ({ firstLine, secondLine, wrapClasses, slClasses, image, imageWidth, imageHeight }) => {

  const textOrImage = () => {
    if (image !== '') {
      return <img src={image} width={imageWidth} height={imageHeight} className={wrapClasses.join(' ')}/>;
    } else {
      return <>
        {firstLine}
        {secondLine || <div className={slClasses.join(' ')}>by &lt;koderhut.eu/&gt;</div>}
      </>;
    }
  };

  return (
    <div data-type="logo" className={wrapClasses.join(' ')}>
      {textOrImage()}
    </div>
  );
};

Logo.propTypes = {
  firstLine:   PropType.node.isRequired,
  secondLine:  PropType.node,
  wrapClasses: PropType.array,
  slClasses:   PropType.array,
  image:       PropType.string,
  imageWidth:  PropType.number,
  imageHeight: PropType.number,
};

Logo.defaultProps = {
  secondLine:  null,
  wrapClasses: [],
  slClasses:   [],
  image:       '',
  imageWidth:  0,
  imageHeight: 0,
};

export default Logo;
