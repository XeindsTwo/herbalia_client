import ContentLoader from "react-content-loader";

export const Loader = () => {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={84}
      viewBox="0 0 340 84"
      backgroundColor="#e3e3e3"
      foregroundColor="#f2e9e9"
    >
      <rect x="0" y="0" rx="3" ry="3" width="67" height="11"/>
      <rect x="76" y="0" rx="3" ry="3" width="140" height="11"/>
      <rect x="117" y="47" rx="3" ry="3" width="53" height="11"/>
      <rect x="180" y="47" rx="3" ry="3" width="72" height="11"/>
      <rect x="5" y="47" rx="3" ry="3" width="100" height="11"/>
      <rect x="0" y="71" rx="3" ry="3" width="37" height="11"/>
      <rect x="4" y="24" rx="3" ry="3" width="140" height="11"/>
      <rect x="156" y="24" rx="3" ry="3" width="173" height="11"/>
    </ContentLoader>
  )
}
