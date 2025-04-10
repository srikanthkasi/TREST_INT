import {
    TEST_AUTHORITY_STATUS_ACTIVE,
    TEST_AUTHORITY_STATUS_INACTIVE,
} from '../constants/testAuthorityConstants';

export const transformTaList = (taList = []) => {
    return [
        ...[
            {
                label: 'Active',
                value: TEST_AUTHORITY_STATUS_ACTIVE,
                key: TEST_AUTHORITY_STATUS_ACTIVE,
            },
            {
                label: 'Inactive',
                value: TEST_AUTHORITY_STATUS_INACTIVE,
                key: TEST_AUTHORITY_STATUS_INACTIVE,
            },
        ],
        ...taList.map(({ taId, name }) => ({
            label: `${name} (${taId})`,
            value: taId,
            key: taId,
        })),
    ];
};
