import React from 'react'
import Header from './Header';
import Topbtn from '../utils/topBtn'
import NotificationPermReq from '../utils/NotificationPermReq'

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