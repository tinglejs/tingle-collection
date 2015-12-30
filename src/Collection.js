/**
 * Collection Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
const classnames = require('classnames');

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  // 根据`col`的设置，补充空的`item`
  fillEmptyItem(n) {
    if (n === 0) {
      return null;
    }

    let t = this;
    let ret = [];

    while (n-- > 0) {
      ret.push(
        <div className='tFB1 tCollectionItem'
             style={t.props.square ? {height: '' + 10/t.props.col + 'rem'} : {}}>
        </div>
      );
    }
    return React.Children.toArray(ret);
  }

  render() {
    let t = this;
    let toFilledItemNumber = t.props.col - React.Children.count(t.props.children);

    return (<div className='tFBH tCollectionRow'>
      {React.Children.toArray(t.props.children.map(function (child) {
        return (
          <div className='tFB1 tCollectionItem'
               style={t.props.square ? {height: '' + 10/t.props.col + 'rem'} : {}}>
            {child}
          </div>
        );
      }))}
      {t.fillEmptyItem(toFilledItemNumber)}
    </div>);
  }
}

Row.defaultProps = {
  col: 4,
  square: false
}

Row.propTypes = {
  col: React.PropTypes.number,
  square: React.PropTypes.bool
}

class Collection extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * 将子元素的索引值根据列数划分成组
   * @returns {Array}
   */
  cutIndexesIntoRows() {
    var t = this;
    let rowIndexes = [];
    let childrenCount = React.Children.count(t.props.children);
    let dummyIndexArray = [];
    let dummyIndex = 0;
    while (childrenCount-- > 0) {
      dummyIndexArray.push(dummyIndex++);
    }

    while (dummyIndexArray.length) {
      rowIndexes.push(dummyIndexArray.splice(0, t.props.col));
    }

    return rowIndexes;
  }

  render() {
    let t = this;
    // react0.14
    let children = React.Children.toArray(t.props.children);

    let rows = t.cutIndexesIntoRows();

    return <div className={classnames('tCollection', {
        [t.props.className]: !!t.props.className,
        noLine: t.props.noLine
    })}>
      {React.Children.toArray(rows.map(function (indexes) {
        return <Row col={t.props.col} square={t.props.square}>
          {indexes.map(function (index) {
            return children[index];
          })}
        </Row>;
      }))}
    </div>;
  }
}

Collection.defaultProps = {
  className: '',
  col: 4,
  square: false,
  noLine: false
}

// http://facebook.github.io/react/docs/reusable-components.html
Collection.propTypes = {
  className: React.PropTypes.string,
  // 列数
  col: React.PropTypes.number,
  // 是否自适应单元格的高度 使单元格成为正方形
  square: React.PropTypes.bool,
  // 是否隐藏分割线
  noLine: React.PropTypes.bool
}

Collection.displayName = 'Collection';

module.exports = Collection;
