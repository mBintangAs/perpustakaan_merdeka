<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Perpustakaan Merdeka || List Buku </title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin-top:30px 
    }

    table, th, td {
        border: 1px solid black;
    }
    td{
        padding: 10px;
    }
</style>

<body style="padding: 30px">
    <div style="float: left;display:block">
        <img src="{{ $logo_kampus_merdeka }}" alt="" width="100" srcset="">
    </div>
    <div style="margin-top:100px;text-align: center">
        <h3>DAFTAR BUKU</h3>
    </div>
    <table >
        <thead  style="background-color:#c5e4d2">
            <tr >
                <td >Uploader</td>
                <td>Category</td>
                <td>Title</td>
                <td>Description</td>
                <td>Quantity</td>
            </tr>
        </thead>
        <tbody >
            @foreach ($buku as $item)
                <tr >
                    <td>{{ $item->uploader }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->title }}</td>
                    <td>{{ $item->description }}</td>
                    <td>{{ $item->quantity }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
