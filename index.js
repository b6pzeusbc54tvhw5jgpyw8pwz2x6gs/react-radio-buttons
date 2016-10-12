import React, { Component, PropTypes } from 'react';

export class RadioGroup extends Component {
  constructor() {
    super();
    this.state = { checkedIndex: -1 };
    this.renderChild = this.renderChild.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  get value() {
    const { checkedIndex } = this.state;
    const { children } = this.props;

    const child = children.find(c => c.props.index === checkedIndex);
    return child && child.props.value || '';
  }

  onCheck(index) {
    this.setState({ checkedIndex: index });
  }

  renderChild(child, index, checked) {
    return React.cloneElement(child, {
      index, checked, onCheck: this.onCheck, ...child.props
    });
  }

  render() {
    const { checkedIndex } = this.state;
    const { children, ...props } = this.props;
    return (
      <div {...props}>
        {
          children.map((c, i) => (this.renderChild(c, i, i === checkedIndex)))
        }
      </div>
    );
  }
}

RadioGroup.propTypes = {
  children: PropTypes.node,
  checkedIndex: PropTypes.integer,
};

export class RadioButton extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onCheck, checked, index } = this.props;
    onCheck && onCheck(checked && -1 || index);
  }

  render() {
    const { checked, value, children } = this.props;
    return (
      <div className={ `btn-radio${checked && '-checked' || ''}` } onClick={ this.onClick }>
        <div className="flex-box">
          <div className="flex-1">
            { children }
          </div>
          <RadioIcon checked={ checked } />
        </div>
      </div>
    );
  }
}

RadioButton.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
  onCheck: PropTypes.func,
};

class RadioIcon extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
  }
  getStyles() {
    const { size, rootColor, pointColor } = this.props;
    
    return {
      root: {
        width: size || 20,
        height: size || 20,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderRadius: '50%',
        borderStyle: 'solid',
        borderColor: rootColor || '#9E9E9E',
      },
      checked: {
        borderColor: pointColor || '#8CB9FD',
      },
      inner: {
        width: size ? size / 2 : 10,
        height: size ? size / 2 : 10,
        borderRadius: '50%',
        background: pointColor || '#8CB9FD',
      }
    }
  }

  render() {
    const { checked } = this.props;
    const style = this.getStyles();
    const iconStyle = Object.assign(style.root, checked ? style.checked : {});
    return (
      <div style={ iconStyle }>
        { checked && <div style={ style.inner } /> }
      </div>
    );
  }
}

RadioIcon.propTypes = {
  size: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  checked: PropTypes.boolean,
};
