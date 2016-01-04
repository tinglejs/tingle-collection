/**
 * Collection Component Demo for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const classnames = require('classnames');

const Collection = require('../src');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      n: 1,
      list: [0,1,2,3,4]
    }
  }

  add() {
    let t = this;
    t.setState({
      n: t.state.n + 1
    });
  }

  render() {
    let t = this;
    return (
      <div>
        <div className="tBCe tFAC tLH44">单元格固定高度</div>
        <Collection col={4} className="tBCf">
          {React.Children.toArray(t.state.list.map((item, index) => {
            return <div onClick={t.add.bind(t)} className="demo">{t.state.n}</div>;
          }))}
          <div className="demo" onClick={t.add.bind(t)}>{t.state.n}</div>
        </Collection>
        <div className="tBCe tFAC tLH44">单元格为正方形</div>
        <Collection col={5} className="tBCf" square={true}>
          <div className="demo" onClick={t.add.bind(t)}>{t.state.n}</div>
        </Collection>
        <div className="tBCe tFAC tLH44">元格无边线</div>
        <Collection col={5} className="tBCf tMB30" square={true} noLine={true}>
          <div className="demo2" style={{background:'#fed678'}}></div>
          <div className="demo2" style={{background:'#7bc380'}}></div>
          <div className="demo2" style={{background:'#f9af45'}}></div>
          <div className="demo2" style={{background:'#9462a9'}}></div>
          <div className="demo2" style={{background:'#4d9df0'}}></div>
        </Collection>
      </div>
    );
  }
};

module.exports = Demo;
