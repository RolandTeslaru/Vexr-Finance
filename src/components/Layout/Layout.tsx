import React, { FC, useEffect, useState } from 'react'
import LeftNav from '../LeftNav/LeftNav'
import TopNav from '../topNav/TopNav'
import { Footer } from '../Footer/Footer'

interface Props{
    children?: React.ReactNode
}

const mockupData = [
  {
    title: "Products",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Integrations", link: "#" },
      { label: "API", link: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", link: "#" },
      { label: "Team", link: "#" },
      { label: "Careers", link: "#" },
      { label: "Contact", link: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", link: "#" },
      { label: "Terms of Service", link: "#" },
      { label: "Disclaimer", link: "#" },
    ],
  },
];

const Layout:FC<Props> = ({children}) => {

  const [leftNavOpen, setLeftNavOpen] = useState(false)


  useEffect(() => {
    console.log("Leftnav opn" , leftNavOpen)
  })
  return (
    <div>
        <TopNav links={[
            {link: "/", label: "Home"},
            {link: "/about", label: "About"},
            {link: "/contact", label: "Contact"},
            {link: "/blog", label: "Blog"},
        ]}
          openState={leftNavOpen}
          openHandler={() => setLeftNavOpen(!leftNavOpen)}
        />
        <LeftNav openState={leftNavOpen} setOpenState={setLeftNavOpen}/>
        {children}
        <Footer data={mockupData} />
    </div>
  )
}

export default Layout