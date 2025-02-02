import { useEffect} from "react"
import { useSelector } from "react-redux"
import { fetchUsers, addUser } from "../store"
import Skeleton from './Skeleton'
import Button from './Button'
import useThunk from '../hooks/useThunk'
import UsersListItem from "./UsersListItem"

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, isLoadingUsersError] = useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

    const {data }=useSelector((state)=>{
      return state.users
  })

  useEffect(()=>{
    doFetchUsers()
  },[doFetchUsers])

  const handleUserAdd = ()=>{
    doCreateUser()
  }

  let content

  if (isLoadingUsers){
    content = <Skeleton times={6} className={'h-10 w-full'}/>
  } else if(isLoadingUsersError){
    content = <div>Error fetching data...</div>
  } else {
    content = data.map((user)=>{
      return <UsersListItem key={user.id} user={user}/>

    })
  }


    return (<div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
          <Button onClick={handleUserAdd} loading={isCreatingUser}>+ Add User</Button>
          {creatingUserError && 'Error creating user...'}
      </div>
      {content}
      </div>)
  
}

export default UsersList