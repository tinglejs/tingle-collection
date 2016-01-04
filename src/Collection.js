/**
 * Collection Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
const classnames = require('classnames');
const {VBox} = require('tingle-box');

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
        <VBox flex={1} hAlign={t.props.itemHAlign} vAlign={t.props.itemVAlign} className='tCollectionItem'
             style={t.props.square ? {height: '' + 10/t.props.col + 'rem'} : {}}>
        </VBox>
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
          <VBox flex={1} hAlign={t.props.itemHAlign} vAlign={t.props.itemVAlign} className='tCollectionItem'
               style={t.props.square ? {height: '' + 10/t.props.col + 'rem'} : {}}>
            {child}
          </VBox>
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
  square: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign
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
    let {className, noLine, ...rowProps} = t.props;

    return <div className={classnames('tCollection', {
        [className]: !!className,
        noLine: noLine
    })}>
      {React.Children.toArray(rows.map(function (indexes) {
        return <Row {...rowProps}>
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
  noLine: false,
  itemHAlign: 'center',
  itemVAlign: 'center'
}

// http://facebook.github.io/react/docs/reusable-components.html
Collection.propTypes = {
  className: React.PropTypes.string,
  // 列数
  col: React.PropTypes.number,
  // 是否自适应单元格的高度 使单元格成为正方形
  square: React.PropTypes.bool,
  // 是否隐藏分割线
  noLine: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign
}

Collection.displayName = 'Collection';

module.exports = Collection;
