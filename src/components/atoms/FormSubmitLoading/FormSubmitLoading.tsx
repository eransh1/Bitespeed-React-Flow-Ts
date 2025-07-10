import styled from 'styled-components'

type FormSubmitLoadingProps = {
    width: string;
    height: string;
}

const FormSubmitLoading = ({ width, height } : FormSubmitLoadingProps) => {
    return (
        <Loader width={width} height={height}>
            <div className='load loading'></div>
        </Loader>
    )
}

const Loader = styled.div`
    .load {
        width:inherit;
        height:inherit;
        background: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-size:5rem ;

    }
    .load::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 4px solid #d6d6d6;
        width:${props => props.width || "15px"};
        height: ${props => props.height || "15px"};
        border-left: 4px solid transparent;
        border-bottom: 4px solid transparent;
        animation: loading1 1s ease infinite;
        z-index: 10
    }
    @keyframes loading1 {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }
`

export default FormSubmitLoading