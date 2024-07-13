import './styles.css'


const Acerca = () => {
  return (
    <>
    <div className='equipo'>
    <h1 className='h1equipo'>Acerca del equipo:</h1>
    <ul className='liequipo'>
        <li>Nombre del equipo: Black waters</li>
        <li>Participacion en: Hackaton HidroTechs</li>
    </ul>
    </div>


<div className='proyecto'>
    <h1 className='h1proyecto'>Acerca del proyecto:</h1>
    <ul className='liproyecto'>
        <li>Problematica a resolver: Buscamos resolver la falta de agua durante los tiempos de sequía en las zonas más necesitadas en México.</li>
        <li>Propuesta de solucion de la problematica: Moisture Water sera un recolector de humedad que tomará la humedad que se encuentre mediante un vórtice. Esta humedad se irá condensando y filtrando dentro del dispositivo, generando agua. </li>
    </ul>
    </div>


    <div className='integrantes'>
    <h1 className='h1integrantes'>Acerca de lider y hackers:</h1>
    <ul className='liintegrantes'>
        <li>Lider: Marco Antonio Romo Delgado</li>
        <li>Hacker: Juan Carlos Santoyo Navarro</li>
        <li>Hacker: Victor Manuel Alvarez Mayorga</li>
        <li>Hacker: Luis Ronaldo Lara Belmares</li>
        <li>Hacker: Erik Becerra Barba</li>
        <li>Hacker: Juan Manuel Gomez Ochoa</li>
    </ul>
    </div>
    </>
  );
};

export default Acerca;
