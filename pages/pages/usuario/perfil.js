import Layout from "@/layout/layout"
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/router';
const Perfil = () => {
  const router = useRouter();
  return (
    <Layout
      title="Perfil"
      description="Datos del usuario"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Perfil</h5>
            <div className="flex align-items-center flex-wrap">
              <Avatar label="U" size="xlarge" shape="circle" className="flex align-items-center justify-content-center m-2" />
              <p className="flex align-items-center justify-content-center m-2">¡Bienvenido!  <br /> <span className="underline"></span></p>
            </div>

            <div className="mt-4">
              <div className="flex align-items-center flex-wrap my-2">
                <i className="pi pi-home flex align-items-center justify-content-center m-2" style={{ fontSize: '2rem' }}></i>
                <Button label="Inicio" text className="flex align-items-center justify-content-center m-2" onClick={() => { router.push('/pages/dashboard') }} />
              </div>


            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Perfil
