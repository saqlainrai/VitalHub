import React, { useState, useEffect } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createRow(desc, perUnit, p1, p2) {
    let details;
    if (p2) {
        details = [p1, p2, p1*p2*perUnit];        
    }
    else {
        details = [p1, p1*perUnit]
    }
    return { desc, details };
}

const DisplayExercise = ({ name, options, data }) => {
    const [rows, setRows] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);          // will use database
    useEffect(() => {
        setRows([]);
        if (options.length == 3) {
            setDailyData([0, 0, 0]);
        }
        else {
            setDailyData([0, 0]);
        }
        if (data && data.length) {
            if (data[0].duration) { // cardiovascular
                let dd = [0, 0];
                let refinedData = data.map(el => {
                    let r = createRow(el.exerciseId.name, el.exerciseId.calories_per_unit, el.duration);
                    dd[0] += r.details[0];
                    dd[1] += r.details[1];
                    return r;
                }); 
                setDailyData(dd);
                setRows(refinedData);
            }
            else {
                let dd = [0, 0, 0]
                let refinedData = data.map(el => {
                    let r = createRow(el.exerciseId.name, el.exerciseId.calories_per_unit, el.sets, el.reps);
                    dd[0] += r.details[0];
                    dd[1] += r.details[1];
                    dd[2] += r.details[2];
                    return r;
                });
                setDailyData(dd);
                setRows(refinedData);
            }
        }
    }, [data]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow key={321}>
                            <td className="title">{name}</td>
                            {
                                options.map((el, index) => (
                                    <td className='btn' key={index} align="right">{el}</td>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                {row.details.map((el, index) => (
                                    <TableCell key={index} align="right">{el}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><button> + Add Exercise </button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1} align='right'>Daily Total</TableCell>
                            {
                                dailyData.map((el, index) => (
                                    <TableCell key={index} align="right">{el.toFixed(2)}</TableCell>
                                ))
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1} align='right'>Weekly Total</TableCell>
                            {
                                dailyData.map((el, index) => (
                                    <TableCell key={index} align="right">{el.toFixed(2)}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default DisplayExercise