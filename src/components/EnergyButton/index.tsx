import styles from './style.module.css'


const EnergyButton = ({onClick} :{onClick: () => void}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <a> <span>List</span> </a>
    </div>
  )
}

export default EnergyButton