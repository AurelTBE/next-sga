import React from 'react'
import Header from './Header';
import Topbtn from '../utils/topBtn'

export default function Layout(props) {
  const {children} = props;
  return (
    <>
      <Header />
      {children}
      <Topbtn />
    </>
  )
}