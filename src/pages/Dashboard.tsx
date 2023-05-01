import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const Dashboard = () => {

  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      {session ? <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </> : <>
        <p>Not signed in</p>
      </>}
    </div>
  )
}

export default Dashboard