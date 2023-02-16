import NoSSR from 'react-no-ssr'
import Record from '../components/record'

export default function TestingVideoComponent() {
    return (
        <NoSSR>
            <Record />
        </NoSSR>
    )
}
