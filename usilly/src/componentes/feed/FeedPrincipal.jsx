import React from 'react'

function Feed_principal() {
  return (
    <div 
      className="bg-[#A3D6CD] bg-repeat soyElPadre flex flex-row-reverse w-full"
      style={{backgroundImage: "url('https://teppyslayouts.neocities.org/img/background/face-12.png')",  backgroundRepeat: 'repeat'}}
    >
      <h1>Estas en el feed principal!!</h1>
      <div className="soyElMasChico opacity-0 sm:opacity-100 bg-amber-700 h-50 w-[50%]">
        a
      </div>
      <div className="soyElMayor bg-red-100 h-50 rounded-[50%] w-50 sm:w-50 flex items-center justify-center">
        b
      </div>
      <Link to="/publicacion">Publicacion</Link>
    </div>

  )
}

export default Feed_principal;