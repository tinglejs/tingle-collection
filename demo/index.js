/**
 * Collection Component Demo for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
require('tingle-context');
window.FastClick && FastClick.attach(document.body);
var Demo = require('./CollectionDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
