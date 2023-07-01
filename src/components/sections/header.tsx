import { MainNav } from '@/components/main-nav'
import { Search } from '@/components/search'
import { UserNav } from '@/components/user-nav'
import Logo from '@/components/logo'
import { Button } from '../ui/button'

const Header = () => {
  return (
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Logo />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <Button variant={"ghost"}>Login</Button>
              <Button>Sign Up</Button>
              <Button variant={'outline'}>Hire Developers</Button>
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
        </div>
  )
}

export default Header