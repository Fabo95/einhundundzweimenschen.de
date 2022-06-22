import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer () {
    return (
        <footer className='footer'>
            <div className='container'>
                <p className='p--footer'>© 2022 Ein Hund und zwei Menschen</p>
                <div className='footer--flex'>
                    <Link className="p--footer p--footer--link" to="/impressum">
                        Impressum
                    </Link>
                    <Link className="p--footer p--footer--link" to="/datenschutz">
                        Datenschutz
                    </Link>
                </div>
            </div>
    </footer>
    )
}