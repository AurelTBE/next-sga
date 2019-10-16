import React from 'react'
import Header from './Header';
import Topbtn from '../utils/topBtn'
import BottomBar from './BottomBar';

export default function Layout(props) {
  const {children} = props;
  return (
    <>
      <Header />
      {children}
      <Topbtn />
      <BottomBar />
    </>
  )
}