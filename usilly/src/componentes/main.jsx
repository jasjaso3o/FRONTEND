import React from 'react'

function Feed_principal () {
  return (
    <div className="soyElPadre flex flex-row-reverse w-full h-80" >
      <div className="soyElMasChico opacity-0 sm:opacity-100 bg-amber-700 h-50 w-[50%]">
        a
      </div>
      <div className="soyElMayor bg-red-100 h-50 rounded-[50%] w-50 sm:w-50 flex items-center justify-center">
        b
      </div>
    </div>
  )
}

export default Feed_principal;