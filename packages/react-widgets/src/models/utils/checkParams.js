export default function checkParams ({ joinOperation, operationColumn }) {
    if (Array.isArray(operationColumn)) {
        if (!joinOperation) {
            throw new Error('Must indicate a join operation when providing multiple operation columns.')
        }
    }
}