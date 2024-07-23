"use client";
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const EmployeeAccess: FC = () => {
    const router = useRouter();

    return (
        <div style={{ height: '75vh' }}>
            <button onClick={() => router.push('/')} style={{ margin: '10px' }}>Back</button>
            <iframe
                title="Permit Element user-management"
                src="https://embed.permit.io/user-management?envId=e0ffba3632274e8085d92c793d34f0c1&darkMode=false"
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default EmployeeAccess;
