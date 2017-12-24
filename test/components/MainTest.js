/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/Main';

import Washer from 'components/Washer';

import Login from 'components/Login';

import Group_Selector from 'components/Group_Selector';

describe('AppComponent', function () {

  beforeEach(function () {
    this.AppComponent = createComponent(Main);
  });

  it('should have its component name as default type', function () {
    expect(this.AppComponent.type).to.equal('div');
  });
});

describe('WasherComponent', function () {

  beforeEach(function () {
    this.WasherComponent = createComponent(Washer);
  });

  it('should have its component name as default className', function () {
    expect(this.WasherComponent.props.className).to.equal('Washer');
  });

  it('should have its component name as default type', function () {
    expect(this.WasherComponent.props.children.props.children[0].props.children.type).to.equal('h1');
  });

  it('should have its component name as default type', function () {
    expect(this.WasherComponent.props.children.props.children[1].props.children.type).to.equal('p');
  });

  it('should have its component name as default inner', function () {
    expect(this.WasherComponent.props.children.props.children[0].props.children.props.children[0]).to.equal('Washer No.');
  });

  it('should have its component name as default className', function () {
    expect(this.WasherComponent.props.children.props.children[1].props.children.props.className).to.equal('washer-text');
  });

  it('should have its component name as default inner', function () {
    expect(this.WasherComponent.props.children.props.children[1].props.children.props.children[0]).to.equal('Time: ');
  });

  it('should have its component name as default type', function () {
    expect(this.WasherComponent.props.children.props.children[2].props.children.type).to.equal('p');
  });

  it('should have its component name as default className', function () {
    expect(this.WasherComponent.props.children.props.children[2].props.children.props.className).to.equal('washer-text');
  });

  it('should have its component name as default inner', function () {
    expect(this.WasherComponent.props.children.props.children[2].props.children.props.children[0]).to.equal('Current Status: ');
  });
});

describe('LoginComponent', function () {

  beforeEach(function () {
    this.LoginComponent = createComponent(Login);
  });

  it('should have its component name as default type', function () {
    expect(this.LoginComponent.type).to.equal('div');
  });
});

describe('Group_SelectorComponent', function () {

  beforeEach(function () {
    this.Group_SelectorComponent = createComponent(Group_Selector);
  });

  it('should have its component name as default type', function () {
    expect(this.Group_SelectorComponent.type).to.equal('div');
  });
});

