import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { Menu } from "lucide-react";
import { ModeToggle } from '../mode-toggle';

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => {
      console.log("Login error:", error);
      toast.error("Google login failed.");
    }
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem("user", JSON.stringify(resp.data));
      toast.success("Login successful!");
      setOpenDialog(false);
      window.location.reload();
    }).catch((err) => {
      console.error("Failed to fetch user", err);
      toast.error("Login failed.");
    });
  };


  return (
    <div className="p-3 shadow-sm flex justify-between items-center w-full fixed top-0 left-0 right-0 bg-background px-5 z-50">
      <img src="/logo.svg" className="h-10 w-auto dark:invert" alt="Logo" />
      <div className='flex items-center gap-3'>
        <ModeToggle />

        {/* Desktop View */}
        <div className='hidden md:flex items-center gap-5'>
          {user ?
            <>
              <a href='/create-trip'>
                <Button variant="outline" className="rounded-full">+ Create Trip</Button>
              </a>
              <a href='/my-trips'>
                <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
            </>
            :
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          }
        </div>

        {/* Mobile View */}
        <div className='md:hidden flex items-center gap-3'>
          {user ?
            <Popover>
              <PopoverTrigger>
                <Menu />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto" sideOffset={10}>
                <div className='flex flex-col gap-2'>
                  <a href='/create-trip'>
                    <Button variant="outline" className="w-full justify-start rounded-full">+ Create Trip</Button>
                  </a>
                  <a href='/my-trips'>
                    <Button variant="outline" className="w-full justify-start rounded-full">My Trips</Button>
                  </a>
                  <Button variant="outline" className="w-full justify-start rounded-full" onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
            :
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          }
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="h-10 w-auto" alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the app securely with Google</p>
              <Button onClick={login} className="w-full mt-5 flex gap-2 items-center justify-center">
                <FcGoogle className="text-xl" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
