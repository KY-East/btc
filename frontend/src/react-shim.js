// 这是React的虚拟模块，用于解决构建时依赖问题
const React = {
  createElement: () => {},
  Fragment: Symbol('Fragment'),
  useState: () => [null, () => {}],
  useEffect: () => {},
  useContext: () => ({}),
  createContext: () => ({ Provider: () => {} }),
  memo: (component) => component,
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
  useRef: () => ({ current: null }),
};

export default React;
export const { 
  createElement, Fragment, useState, useEffect, 
  useContext, createContext, memo, useMemo, 
  useCallback, useRef 
} = React; 