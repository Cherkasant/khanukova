type DocumentIconType = {
  width: string
  height: string
}

const DocumentIcon: React.FC<DocumentIconType> = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.4275 21.4269C19.4275 21.8816 19.2468 22.3176 18.9254 22.6391C18.6039 22.9606 18.1678 23.1412 17.7132 23.1412H2.2846C1.82994 23.1412 1.39391 22.9606 1.07242 22.6391C0.750924 22.3176 0.570313 21.8816 0.570312 21.4269V2.56975C0.570312 2.1151 0.750924 1.67906 1.07242 1.35757C1.39391 1.03608 1.82994 0.855469 2.2846 0.855469H10.856L19.4275 9.4269V21.4269Z"
        stroke="#0E4298"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.8516 0.855469V9.4269H19.423" stroke="#0E4298" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default DocumentIcon
