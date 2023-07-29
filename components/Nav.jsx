"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggoleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="logo" width={30} height={20} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>
      
      {/* desctop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="create-prompt" className="black_btn">Create Post</Link>
            <button type="button" className="outline_btn" onClick={signOut}>Sing Out</button>
            <Link href="/profile"><Image loader={() => session?.user.image} src={session?.user.image} alt="profile" width={37} height={37} className="rounded-full" /></Link>
          </div>
        )
        : (
          <>
          {providers && Object.values(providers).map((provider) => <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sing in</button>)}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image loader={() => session?.user.image} src={session?.user.image} alt="profile" width={37} height={37} className="rounded-full" onClick={() => (setToggoleDropDown((prev) => !prev))} />
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggoleDropDown(false)}>My Profile</Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggoleDropDown(false)}>Create Prompt</Link>
                <button type="button" className="mt-5 w-full black_btn" onClick={() => {
                  setToggoleDropDown(false);
                  signOut();
                }}>Sing Out</button>
              </div>
            )}
          </div>
        )
        : (
          <>
          {providers && Object.values(providers).map((provider) => <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sing in</button>)}
          </>
        )}
      </div>
    </nav>
  );
};
