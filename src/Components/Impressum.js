import React from 'react'
import { Outlet} from "react-router-dom";


export default function Impressum (props) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
      })

    return (
        
    <div className='law container'>
        <Outlet />
            <h1 className='h1--law'>
                Impressum
            </h1>
        <div className='law--body'>
        <h3 className="h3--law">Angaben gemäß § 5 TMG</h3> 
                <p>
                    Fabian Hinz <br/>
                    Fritz-Bauer-Str. 21 <br/>
                    53123 Bonn

                </p>
                <h3 className="h3--law">Kontakt</h3> 
                <p>
                    Fabian Hinz <br/>
                    0172 6422583 <br/>
                    f-hinz@outlook.de
                </p>
                <h3 className="h3--law">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3> 
                <p>
                    Fabian Hinz <br/>
                    Fritz-Bauer-Str. 21 <br/>
                    53123 Bonn
                </p>
                <h3 className="h3--law">Streitschlichtung</h3> 
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.
                    Meine E-Mail-Adresse finden Sie oben im Impressum.<br/> <br/>

                    Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
                <h3 className="h3--law">Haftung für Inhalte</h3> 
                <p>
                    Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
                </p>
                <h3 className="h3--law">Haftung für Links</h3> 
                <p>
                    Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.

                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.
                </p>
                <h3 className="h3--law">Urheberrecht</h3> 

                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.

                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.
                </p>
                <Outlet />


                
           
        </div>
    </div>
    )
}