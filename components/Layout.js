import React from 'react'
import Header from './Header';
import Topbtn from '../hooks/topBtn'

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