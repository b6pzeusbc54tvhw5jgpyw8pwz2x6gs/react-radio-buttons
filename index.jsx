import React, { Component, PropTypes } from 'react';

export class RadioGroup extends Component {
  constructor({ children, value }) {
    super();
    const index = children.findIndex(c => c.props.value === value);
    this.state = { checkedIndex: index > -1 ? index : 0 };
    this.renderChild = this.renderChild.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  get value() {
    const { checkedIndex } = this.state;
    const { children } = this.props;

    const child = children.find(c => c.props.index === checkedIndex);
    return child && child.props.value || '';
  }

  onChange(index) {
    const { onChange, children } = this.props;
    const child = children[index];
    if (!child) return;

    this.setState({ checkedIndex: index });
    onChange && onChange(child.props.value || '');
  }

  renderChild(child, index, checked) {
    const { children, horizontal } = this.props;
    return React.cloneElement(child, {
      horizontal, index, checked,
      last: index === children.length - 1,
      onChange: this.onChange, ...child.props
    });
  }

  render() {
    const { checkedIndex } = this.state;
    const { horizontal, children, ...props } = this.props;
    const style = horizontal ? { display: 'inline-flex', width: '100%' } : {};
    return (
      <div style={ style } {...props}>
        {
          children.map((c, i) => (this.renderChild(c, i, i === checkedIndex)))
        }
      </div>
    );
  }
}

RadioGroup.propTypes = {
  horizontal: PropTypes.boolean,
  children: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export class RadioButton extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getStyles() {
    const { horizontal, last, padding, rootColor, pointColor } = this.props;

    return {
      root: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: rootColor || '#E0E0E0',
        borderRadius: 1,
        padding: padding || 16,
        flex: 1,
        marginBottom: horizontal ? 0 : (padding || 16),
        marginRight: horizontal && !last ? (padding || 16) / 2 : 0,
      },
      checked: {
        borderColor: pointColor || '#8CB9FD',
        color: pointColor || '#8CB9FD',
      },
    };
  }

  onClick() {
    const { onChange, checked, index } = this.props;
    onChange && onChange(index);
  }

  render() {
    const { checked, iconSize, iconInnerSize, rootColor, pointColor, children } = this.props;
    const style = this.getStyles();
    const buttonStyle = Object.assign(style.root, checked ? style.checked : {});
    return (
      <div style={ buttonStyle } onClick={ this.onClick }>
        <div style={ { display: 'inline-flex', width: '100%' } }>
          <div style={ { flex: 1 } }>
            { children }
          </div>
          <RadioIcon size={ iconSize } innerSize={ iconInnerSize } 
            checked={ checked } rootColor={ rootColor } pointColor={ pointColor }
          />
        </div>
      </div>
    );
  }
}

RadioButton.propTypes = {
  iconSize: PropTypes.number,
  iconInnerSize: PropTypes.number,
  padding: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
  checked: PropTypes.boolean,
  children: PropTypes.node,
  horizontal: PropTypes.boolean,
  onChange: PropTypes.func,
};

class RadioIcon extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    const { size, innerSize, rootColor, pointColor } = this.props;
    
    return {
      root: {
        width: size || 10,
        height: size || 10,
        padding: 3,
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
        width: innerSize || 10,
        height: innerSize || 10,
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
  innerSize: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  checked: PropTypes.boolean,
};
