// convex hull (Graham scan by x-coordinate) and diameter of a set of points
// David Eppstein, UC Irvine, 7 Mar 2002

function orientation(p,q,r) {
    return (q[1]-p[1])*(r[0]-p[0]) - (q[0]-p[0])*(r[1]-p[1]);
}

function hulls(points) {
    let U = [];
    let L = [];
    points.sort((a,b) => (a[0] - b[0]) || (a[1] - b[1]));
    points.forEach(p => {
        while (U.length > 1 && orientation(U[U.length-2],U[U.length-1], p) <= 0) {
            U.pop();
        }
        while (L.length > 1 && orientation(L[L.length-2],L[L.length-1], p) >= 0) {
            L.pop();
        }
        U.push(p);
        L.push(p);
    })
    return [U, L];
}


function* rotatingCalipers(points) {
    let [U,L] = hulls(points);
    let i = 0;
    let j = L.length - 1;
    while (i < U.length - 1 || j > 0) {
        yield [U[i], L[j]];

        if (i === U.length -1) {
            j -= 1;
        } else if (j === 0) {
            i += 1;
        } else if ((U[i+1][1]-U[i][1])*(L[j][0]-L[j-1][0]) > (L[j][1]-L[j-1][1])*(U[i+1][0]-U[i][0])) {
            i += 1
        } else {
            j -= 1
        }
    }
}

function getPoints(points) {
    let point = [];
    let max = 0;

    [...rotatingCalipers(points)].forEach(([p,q]) => {
        let diam = ((p[0]-q[0])**2 + (p[1]-q[1])**2);
        if (diam > max) {
            max = diam;
            point = [p,q];
        }
    });
    return point;
}



