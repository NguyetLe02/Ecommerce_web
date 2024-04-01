import React, { useEffect, useState, useCallback } from 'react'
import { apiGetUsers } from '../../apis/user'
import moment from 'moment'
import { Search } from '../../components'
import { useDebounce, Pagination } from '../../components'
import { useSearchParams } from 'react-router-dom'

const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const [q, setQ] = useState('')
  const queriesDebounce = useDebounce(q, 800)
  const [params] = useSearchParams()
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: 2 });
    if (response.success) setUsers(response)
  }

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce, params])


  return (
    <div className=' h-screen w-full px-8'>
      <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
        <span>Quản lý người dùng</span>
      </h1>
      <div className='py-4'>
        <div className=' flex justify-end py-4'>
          <Search
            value={q}
            setValue={setQ}
            style={' w-[500px] '}
            isHideLabel
            placeholder={'Tìm kiếm bằng tên hoặc mail'}
          />
        </div>
        <div className=' rounded-md border border-primary-1'>
          <table className=' w-full table-auto text-left'>
            <thead className=' font-bold bg-primary-1  text-red-50'>
              <tr>
                <th className=' py-2 px-4'>#</th>
                <th className=' py-2 px-4'>Email address</th>
                <th className=' py-2 px-4'>Full name</th >
                <th className=' py-2 px-4'>Role</th >
                <th className=' py-2 px-4'>Phone number</th>
                <th className=' py-2 px-4'>Status</th>
                <th className=' py-2 px-4'>Created At</th>
                <th className=' py-2 px-4'>Actions</th >
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, idx) => (
                <tr key={el._id} className=' border-t border-primary-1'>
                  <td className=' py-2 px-4'>{idx + 1}</td>
                  <td className=' py-2 px-4'>{el.email}</td>
                  <td className=' py-2 px-4'>{el.firstname + ' ' + el.lastname}</td>
                  <td className=' py-2 px-4'>{el.role}</td>
                  <td className=' py-2 px-4'>{el.mobile}</td>
                  <td className=' py-2 px-4'>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className=' py-2 px-4'>{moment(el.createdAt).format('l')}</td>
                  <td className=' py-2 px-4 flex justify-between'>
                    <div className=' hover:cursor-pointer text-primary-1 hover:underline'>Update</div>
                    <div className=' hover:cursor-pointer text-red-400 hover:underline'>Delete</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div >
      <div className=' italic'>
        <Pagination
          totalCount={users?.counts}
        />
      </div>
    </div >
  )
}

export default ManageUser
