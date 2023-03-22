import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    background-color: #88fdc8;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
      background-color: #88fdc8;
    }
    .dashboard-page {
      width: 90%;
      background-color: #88fdc8;
    }
  }
`
export default Wrapper
