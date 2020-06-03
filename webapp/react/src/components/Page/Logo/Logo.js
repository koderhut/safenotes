import React from 'react';
import PropType from 'prop-types';

const Logo = ({ firstLine, secondLine, wrapClasses, slClasses, image, imageWidth, imageHeight, imageCss, children }) => {

  if (children != null) {
    firstLine = children;
  }

  const textOrImage = () => {
    if (image !== '') {
      return <img alt="Logo" src={image} width={imageWidth} height={imageHeight} className={imageCss.join(' ')}/>;
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
  imageWidth:  PropType.string,
  imageHeight: PropType.string,
  iamgeCss:    PropType.array,
};

Logo.defaultProps = {
  secondLine:  null,
  wrapClasses: [],
  slClasses:   [],
  image:       '',
  imageWidth:  '0px',
  imageHeight: '0px',
  imageCss:    [],
};

export default Logo;
