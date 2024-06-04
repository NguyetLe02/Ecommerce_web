import React, { useEffect, useState, useCallback } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from '../../apis/user'
import moment from 'moment'
import { Button, Search } from '../../components'
import { useDebounce, Pagination, InputForm, Select } from '../../components'
import { blockStatus, roles } from '../../ultils/contants'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import validateRegex from '../../ultils/validateRegex'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const ManageUser = () => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    mobile: '',
    isBlocked: '',
  })

  const [users, setUsers] = useState(null)
  const [q, setQ] = useState('')
  const [editEl, setEditEl] = useState(null)
  const [update, setUpdate] = useState(false)
  const queriesDebounce = useDebounce(q, 800)
  const [params] = useSearchParams()

  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: 2 });
    if (response.success) setUsers(response)
  }

  const render = useCallback(() => {
    setUpdate(!update)
    setEditEl(null)
  }, [update])

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce, params, update])

  const handleUpdate = async (data) => {
    // const response = await apiUpdateUser(data, editEl?._id)
    // if (response.success) {
    //   render()
    //   toast.success(response.mes)
    // } else toast.error(response.mes)
  }

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: 'Bạn có muốn xóa người dùng này không?',
      showCancelButton: true
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUser(uid)
        if (response.success) {
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
  }
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
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className=' py-3'>
            {editEl && <Button type='submit' style={'px-4 py-2 rounded-md text-primary-1 bg-sub font-semibold text-red-50'} name={'Update'} fullWidth></Button>}
          </div>
          <ToastContainer />
          <div className=' rounded-md border border-sub'>
            <table className=' w-full table-auto text-left pt-2'>
              <thead className=' font-bold bg-sub  text-red-50'>
                <tr>
                  <th className=' py-2 px-4'>#</th>
                  <th className=' py-2 px-4'>Email address</th>
                  <th className=' py-2 px-4'>Firstname</th >
                  <th className=' py-2 px-4'>Lastname</th >
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
                    <td className=' py-2 px-4'>
                      {editEl?._id === el._id
                        ? <InputForm
                          register={register}
                          errors={errors}
                          setValue={setValue}
                          id={'email'}
                          validate={{
                            required: 'Require fill',
                            pattern: {
                              value: validateRegex.emailValidate.value,
                              message: validateRegex.emailValidate.message
                            }
                          }}
                          defaultValue={el.email}
                          fullWidth
                        />
                        : <span>{el.email}</span>}
                    </td>
                    <td className=' py-2 px-4'>{
                      editEl?._id === el._id
                        ? <InputForm
                          register={register}
                          setValue={setValue}
                          errors={errors}
                          id={'firstname'}
                          validate={{ required: 'Require fill' }}
                          defaultValue={editEl?.firstname}
                          fullWidth
                        />
                        : <span>{el.firstname}</span>
                    }</td>
                    <td className=' py-2 px-4'>{
                      editEl?._id === el._id
                        ? <InputForm
                          register={register}
                          setValue={setValue}
                          errors={errors}
                          id={'lastname'}
                          validate={{ required: 'Require fill' }}
                          defaultValue={editEl?.lastname}
                          fullWidth
                        />
                        : <span>{el.lastname}</span>
                    }</td>
                    <td className=' py-2 px-4'>{
                      editEl?._id === el._id
                        ? <Select
                          register={register}
                          errors={errors}
                          id={'role'}
                          validate={{ required: 'Require fill' }}
                          defaultValue={roles.find(role => +role.code === +editEl.role)?.value}
                          options={roles}
                          fullWidth
                        />
                        : <span>{roles.find(role => +role.code === +el.role)?.value}</span>
                    }</td>
                    <td className=' py-2 px-4'>{
                      editEl?._id === el._id
                        ? <InputForm
                          register={register}
                          setValue={setValue}
                          errors={errors}
                          id={'mobile'}
                          validate={{
                            required: 'Require fill',
                            pattern: {
                              value: validateRegex.phoneValidate.value,
                              message: validateRegex.phoneValidate.message
                            }
                          }}
                          defaultValue={el.mobile}
                          fullWidth
                        />
                        : <span>{el.mobile}</span>
                    }</td>
                    <td className=' py-2 px-4'>{
                      editEl?._id === el._id
                        ? <Select
                          register={register}
                          setValue={setValue}
                          errors={errors}
                          id={'isBlocked'}
                          validate={{ required: 'Require fill' }}
                          defaultValue={editEl?.isBlocked}
                          options={blockStatus}
                          fullWidth
                        />
                        : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                    }</td>
                    <td className=' py-2 px-4'>{moment(el.createdAt).format('l')}</td>
                    <td className=' py-2 px-4'>
                      <div className=' flex gap-3 justify-center'>
                        {editEl?._id === el._id ? <div onClick={() => {
                          setEditEl(null)
                        }} className=' hover:cursor-pointer text-primary-1 hover:underline'>Back</div>
                          : <div onClick={() => {
                            setEditEl(el)

                          }} className=' hover:cursor-pointer text-primary-1 hover:underline'>Edit</div>
                        }
                        <div onClick={() => handleDeleteUser(el._id)} className=' hover:cursor-pointer text-red-400 hover:underline'>Delete</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>

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
