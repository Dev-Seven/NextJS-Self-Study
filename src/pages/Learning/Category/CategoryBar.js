import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCategoryBySubject } from 'src/store/slices/LearningSlice'
import styled from 'styled-components'

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const LI = styled.li``

const Item = styled.div`
  display: flex;
  padding: 12px 18px;
  padding-left: ${props => `${props.dept * 18}px`};
  align-items: center;
`

const Label = styled.span`
  width: 100%;
  display: block;
  cursor: pointer;
`

const Arrow = styled.span`
  display: flex;
  height: 25px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-top: 4px solid #000;

    transform: ${props => (props.toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`

const MultiMenus = ({ menus, setMenus }) => {
  const [activeMenus, setActiveMenus] = useState([])

  // const [menus, setMenus] = useState(menuss)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  const handleMenuClick = data => {
    dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: data?.id })).then(res => {
      if (res.payload?.status === 400) {
        alert(res.payload.message + 'please add new category')
      } else if (res.payload?.status === 200) {
        // let updatedobject = {
        //   // ...data,
        //   submenu: res.payload?.data?.map(item => {
        //     return { label: item?.CategoryName, id: item?._id }
        //   })
        // }

        const newState = menus?.map((obj, index) => {
          // 👇️ if id equals 2, update country property
          if (obj?.submenu) {
            if (obj?.submenu?.length > 0) {
              obj?.submenu?.length &&
                obj?.submenu?.filter(item => {
                  if (item.id === data.id) {
                    let newObject = {
                      submenu: res.payload?.data?.map(item => {
                        return { label: item?.CategoryName, id: item?._id }
                      })
                    }

                    return Object.assign(item, newObject)
                  }
                })
            }

            // return {
            //   ...obj,
            //   submenu: res.payload?.data?.map(item => {
            //     return { label: item?.CategoryName, id: item?._id }
            //   })
            // }
            // return {
            //   ...obj,
            //   submenu: res.payload?.data?.map(item => {
            //     return { label: item?.CategoryName, id: item?._id }
            //   })
            // }
          } else if (obj.id === data?.id) {
            if (res.payload?.data) {
              return {
                ...obj,
                submenu: res.payload?.data?.map(item => {
                  return { label: item?.CategoryName, id: item?._id }
                })
              }
            }
          } else if (obj?.submenu?.submenu?.length > 0) {
            obj?.submenu?.submenu &&
              obj?.submenu?.submenu?.filter(item => {
                if (item.id === data.id) {
                  let newObject = {
                    submenu: res.payload?.data?.map(item => {
                      return { label: item?.CategoryName, id: item?._id }
                    })
                  }

                  return Object.assign(item, newObject)
                }
              })
          }

          // 👇️ otherwise return the object as is
          return obj
        })

        setMenus(newState)

        // const currentTodoIndex = menus.findIndex(todo => todo.id === data.id)
        // // 2. Mark the todo as complete
        // let updatedTodo = Object.assign({}, menus[currentTodoIndex])
        // updatedTodo = updatedobject
        // // 3. Update the todo list with the updated todo
        // const newTodos = menus.slice()
        // newTodos[currentTodoIndex] = updatedTodo

        // setMenus(newTodos)
        // menus?.filter((items, index) => {
        //
        //   if (items.id === updatedobject.id) {
        //   }

        // })
      }
    })

    // menus?.filter((items, index) => {
    //   if (items?.id === data?.id) {
    //
    //     dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: data?.id })).then(res => {
    //       if (res.payload?.status === 400) {
    //         alert(res.payload.message + 'please add new category')
    //       } else if (res.payload?.status === 200) {
    //         let updatedobject = {
    //           ...items,
    //           submenu: res.payload?.data?.map(item => {
    //             return { label: item?.CategoryName, id: item?._id }
    //           })
    //         }
    //       }
    //     })
    //   } else {
    //
    //   }
    // })
  }

  const handleArrowClick = menuName => {
    let newActiveMenus = [...activeMenus]

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName)
      if (index > -1) {
        newActiveMenus.splice(index, 1)
      }
    } else {
      newActiveMenus.push(menuName)
    }

    setActiveMenus(newActiveMenus)
  }

  // useEffect(() => {
  //   if (menuss) {
  //     setMenus(menuss)
  //   }
  // }, [])
  const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex }) => (
    <LI>
      <Item dept={dept}>
        <Label onClick={() => handleMenuClick(data)}>{data?.label} </Label>
        {hasSubMenu && <Arrow onClick={() => handleArrowClick(menuName)} toggle={activeMenus.includes(menuName)} />}
      </Item>
      {hasSubMenu && (
        <SubMenu dept={dept} data={data.submenu} toggle={activeMenus.includes(menuName)} menuIndex={menuIndex} />
      )}
    </LI>
  )

  const SubMenu = ({ dept, data, toggle, menuIndex }) => {
    if (!toggle) {
      return null
    }

    dept = dept + 1

    return (
      <UL>
        {data?.map((menu, index) => {
          const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`

          return (
            <ListMenu
              dept={menu?.submenu?.length}
              data={menu}
              hasSubMenu={menu?.submenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
            />
          )
        })}
      </UL>
    )
  }

  return (
    <UL>
      {menus?.map((menu, index) => {
        const dept = 1
        const menuName = `sidebar-menu-${dept}-${index}`

        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu?.submenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        )
      })}
    </UL>
  )
}

export default MultiMenus
