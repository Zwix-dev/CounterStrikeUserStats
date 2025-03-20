import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    link:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({firstName,link,}) => (
    <div className='flex flex-col items-center'>
        <div>
            <h1>Welcome, {firstName}!, veuillez valider votre e-mail</h1>
        </div>
        <div>
            <a href={link}><button className='bg-purple-400 p-2 rounded-lg'> Ici</button></a>
        </div>
    </div>
);