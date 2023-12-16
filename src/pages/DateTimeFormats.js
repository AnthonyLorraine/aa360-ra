const DateTimeFormats = () => {
    return <>
        <section id="datetimeformat" className="mt-5 container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <header className="h1">Common Formats</header>
                    <table className="table mb-5 mt-3">
                        <colgroup>
                            <col style={{width: 25 + '%'}}/>
                            <col style={{width: 25 + '%'}}/>
                            <col style={{width: 50 + '%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Example</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><code>yyyyMMdd</code></td>
                            <td>20240321</td>
                            <td>Format used for log files</td>
                        </tr>
                        <tr>
                            <td><code>dd-MM-yyyy hh:MM:ss</code></td>
                            <td>26-10-2024 12:12:36</td>
                            <td>Format used as a log message time stamp prefix</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <header className="h1">DateTime Formats</header>
                    <table className="table mt-3">
                        <colgroup>
                            <col style={{width: 25 + '%'}} />
                            <col style={{width: 25 + '%'}}/>
                            <col style={{width: 50 + '%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Example</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><code>EEE</code></td>
                            <td>Sat</td>
                            <td>Weekday's short name</td>
                        </tr>
                        <tr>
                            <td><code>EEEE</code></td>
                            <td>Saturday</td>
                            <td>Weekday's full name</td>
                        </tr>
                        <tr>
                            <td><code>d</code></td>
                            <td>6</td>
                            <td>Day of the month</td>
                        </tr>
                        <tr>
                            <td><code>dd</code></td>
                            <td>06</td>
                            <td>Day of the month, zero padded</td>
                        </tr>
                        <tr>
                            <td><code>MMM</code></td>
                            <td>Oct.</td>
                            <td>Month name abbreviated. Includes a full stop at the end of the abbreviation. No full stop for May</td>
                        </tr>
                        <tr>
                            <td><code>MMMM</code></td>
                            <td>October</td>
                            <td>Month name</td>
                        </tr>
                        <tr>
                            <td><code>M</code></td>
                            <td>8</td>
                            <td>Month number</td>
                        </tr>
                        <tr>
                            <td><code>MM</code></td>
                            <td>08</td>
                            <td>Month number, zero padded</td>
                        </tr>
                        <tr>
                            <td><code>yy</code></td>
                            <td>24</td>
                            <td>Year number, shortened</td>
                        </tr>
                        <tr>
                            <td><code>yyyy</code></td>
                            <td>2024</td>
                            <td>Year number</td>
                        </tr>
                        <tr>
                            <td><code>H</code></td>
                            <td>8</td>
                            <td>Hour number (24-hour clock)</td>
                        </tr>
                        <tr>
                            <td><code>HH</code></td>
                            <td>08</td>
                            <td>Hour number, zero padded (24-hour clock)</td>
                        </tr>
                        <tr>
                            <td><code>h</code></td>
                            <td>6</td>
                            <td>Hour number (12-hour clock)</td>
                        </tr>
                        <tr>
                            <td><code>hh</code></td>
                            <td>06</td>
                            <td>Hour number, zero padded (12-hour clock)</td>
                        </tr>
                        <tr>
                            <td><code>a</code></td>
                            <td>AM</td>
                            <td>AM or PM marker when used with the 12-hour clock</td>
                        </tr>
                        <tr>
                            <td><code>m</code></td>
                            <td>4</td>
                            <td>Minute in an hour</td>
                        </tr>
                        <tr>
                            <td><code>mm</code></td>
                            <td>04</td>
                            <td>Minute in an hour, zero padded</td>
                        </tr>
                        <tr>
                            <td><code>s</code></td>
                            <td>5</td>
                            <td>Second in a minute</td>
                        </tr>
                        <tr>
                            <td><code>ss</code></td>
                            <td>05</td>
                            <td>Second in a minute, zero padded</td>
                        </tr>
                        <tr>
                            <td><code>SSS</code></td>
                            <td>458</td>
                            <td>Milliseconds</td>
                        </tr>
                        <tr>
                            <td><code>z</code></td>
                            <td>Australian Western Standard Time</td>
                            <td>Timezone name</td>
                        </tr>
                        <tr>
                            <td><code>Z</code></td>
                            <td>+0800</td>
                            <td>Timezone UTC offset</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </>
        ;
};

export default DateTimeFormats;