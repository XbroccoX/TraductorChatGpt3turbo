import { FC } from "react";
import { Form } from "react-bootstrap"
import { SectionType } from '../types.d';

interface Props {
    loading?: boolean;
    onChange: (value: string) => void;
    type: SectionType;
    value: string;
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Ingresar Texto'
    if (loading === true) return 'Cargando...'
    return 'Traduccion'
}


export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
    const styles = type === SectionType.From
        ? { ...commonStyles, backgroundColor: '#f5f5f5' }
        : commonStyles

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as={'textarea'}
            placeholder={getPlaceHolder({ type, loading })}
            autoFocus={type === SectionType.From}
            style={styles}
            disabled={type === SectionType.To}
            value={value}
            onChange={handleChange}
        />
    )
}
